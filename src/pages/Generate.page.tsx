// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { IconCopy, IconDownload, IconFileText, IconRotate } from '@tabler/icons-react';
import { Button, Container, Divider, Grid, Group, Select, Textarea, TextInput, Title, Tooltip, Accordion, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MultiSelectCreatable } from '@/components/CreatableMultiSelect/CreatableMultiSelect';
import { FileDetails } from '@/components/FileDetails/FileDetails';
import { useLanguage } from '@/context/LanguageContext';


export const Generate = () => {
  const [downloadUrl, setDownloadUrl] = useState(null); // Store the blob URL for download
  const [triggerEventsData, setTriggerEventsData] = useState([
    { value: "push", label: "Push" },
    { value: "pull_request", label: "Pull Request" },
  ]);

  const [branchesData, setBranchesData] = useState([
    { value: "main", label: "Main" },
    { value: "develop", label: "Develop" },
    { value: "feature", label: "Feature" },
  ]);

  const [fileHistory, setFileHistory] = useState([]); // Store the user's file history
  const [visibleFiles, setVisibleFiles] = useState(5); // Number of files to display initially
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for file history
  const [errorHistory, setErrorHistory] = useState(null); // Error state for fetching history
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status


  const { t } = useLanguage(); // Access the translation function

  const form = useForm({
    initialValues: {
      workflowName: 'CI Workflow',
      triggerEvents: ['push', 'pull_request'],
      branches: ['main'],

      // Build Config
      buildTool: 'Maven',
      buildProjectPath: './',

      // Test Config
      testBuildTool: 'Maven',
      testProjectPath: './',

      // Deployment Config
      cloudProvider: '',
      deploymentType: '',
    },

    validate: {
      workflowName: (value) => (value ? null : 'Workflow name is required'),
      buildTool: (value) => (value ? null : 'Build tool is required'),
      testBuildTool: (value) => (value ? null : 'Test build tool is required'),
      branches: (value) => (value.length > 0 ? null : 'At least one branch is required'),
      cloudProvider: (value) => (value ? null : 'Cloud provider is required'),
      deploymentType: (value) => (value ? null : 'Deployment type is required'),
    },
  });

  const handleGenerate = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('Auth token not found. Please log in first.');
        return;
      }

      const payload = {
        ...form.values,
        triggerEvents: triggerEventsData.map((item) => item.value),
        branches: branchesData.map((item) => item.value),
      };

      const response = await fetch('http://localhost:8080/api/yaml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Add Authorization header
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const blob = await response.blob();
        const yamlText = await blob.text();

        form.setFieldValue('yamlPreview', yamlText);
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);

        fetchFileHistory();
      } else {
        console.error('Error generating YAML file:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating YAML file:', error);
    }
  };

  const fetchFileHistory = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      setIsLoggedIn(!!authToken);
      if (!authToken) {
        return;
      }

      setLoadingHistory(true);
      setErrorHistory(null);

      const response = await fetch('http://localhost:8080/api/yaml/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const history = await response.json();
        setFileHistory(history);
      } else {
        setErrorHistory(t('generate.historyError'));
      }
    } catch (error) {
      setErrorHistory(t('generate.historyUnexpectedError'));
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchFileHistory();
  }, []);

  const handleShowMore = () => {
    setVisibleFiles((prev) => prev + 5); // Show 5 more files
  };

  const deploymentTypes = {
    AWS: [
      { value: 'LambdaFunction', label: 'Lambda/Function' },
      { value: 'WebResource', label: 'Web Resource' },
      { value: 'ContainerizedAppECS', label: 'Containerized App (ECS)' },
      { value: 'SDK', label: 'SDK' },
    ],
    Azure: [
      { value: 'Function', label: 'Function' },
      { value: 'WebAppAppService', label: 'Web App (App Service)' },
      { value: 'ContainerizedAppAKS', label: 'Containerized App (AKS)' },
      { value: 'SDK', label: 'SDK' },
    ],
    'Google Cloud': [
      { value: 'CloudFunction', label: 'Cloud Function' },
      { value: 'WebAppAppEngine', label: 'Web App (App Engine)' },
      { value: 'ContainerizedAppGKE', label: 'Containerized App (GKE)' },
      { value: 'SDK', label: 'SDK' },
    ],
  };

  return (
    <Container mt="lg">
      <Grid align="center" justify="center" mb="xl">
        <Grid.Col span={12} style={{ textAlign: 'center' }}>
          <Title order={2}>{t('generate.title')}</Title>
        </Grid.Col>
      </Grid>

      <Divider my="lg" />

      <form onSubmit={form.onSubmit(handleGenerate)}>
        <Grid gutter="md">
          <Grid.Col md={6}>
            <TextInput
              label={t('generate.workflowName')}
              placeholder={t('generate.workflowNamePlaceholder')}
              required
              {...form.getInputProps('workflowName')}
            />
            <MultiSelectCreatable
              label={t('generate.triggerEvents.label')}
              mt="md"
              initialData={triggerEventsData}
              onChange={(values) => {
                setTriggerEventsData(values);
                form.setFieldValue('triggerEvents', values); // Sync with form values
              }}
            />
            <MultiSelectCreatable
              label={t('generate.branches.label')}
              initialData={branchesData}
              onChange={(values) => {
                setBranchesData(values);
                form.setFieldValue('branches', values); // Sync with form values
              }}
            />
            <Select
              label={t('generate.buildTool')}
              placeholder={t('generate.buildToolPlaceholder')}
              mt="md"
              data={[
                { value: 'Maven', label: 'Maven' },
                { value: 'Gradle', label: 'Gradle' },
              ]}
              {...form.getInputProps('buildTool')}
            />
            <TextInput
              label={t('generate.buildProjectPath')}
              placeholder={t('generate.buildProjectPathPlaceholder')}
              mt="md"
              {...form.getInputProps('buildProjectPath')}
            />

            <Title order={4} mt="xl">
              {t('generate.deploymentConfig')}
            </Title>
            <Select
              label={t('generate.cloudProvider')}
              placeholder={t('generate.cloudProviderPlaceholder')}
              mt="md"
              data={[
                { value: 'AWS', label: 'AWS' },
                { value: 'Azure', label: 'Azure' },
                { value: 'Google Cloud', label: 'Google Cloud' },
              ]}
              {...form.getInputProps('cloudProvider')}
              onChange={(value) => {
                form.setFieldValue('cloudProvider', value);
                form.setFieldValue('deploymentType', ''); // Reset deployment type
              }}
            />
            <Select
              label={t('generate.deploymentType')}
              placeholder={t('generate.deploymentTypePlaceholder')}
              mt="md"
              data={deploymentTypes[form.values.cloudProvider] || []}
              {...form.getInputProps('deploymentType')}
              disabled={!form.values.cloudProvider}
            />

            <Title order={4} mt="xl">
              {t('generate.staticAnalysis')}
            </Title>
            <Select
              label={t('generate.staticAnalysisProvider')}
              placeholder={t('generate.staticAnalysisPlaceholder')}
              mt="md"
              data={[
                { value: 'sonarqube', label: 'SonarQube' },
              ]}
              {...form.getInputProps('staticAnalysis')}
              onChange={(value) => {
                form.setFieldValue('staticAnalysis', value);
              }}
            />

            <Group mt="xl">
              <Button type="submit" variant="filled" color="dark" leftIcon={<IconFileText size={16} />}>
                {t('generate.generateButton')}
              </Button>
              <Button
                variant="outline"
                color="dark"
                onClick={() => {
                  form.reset();
                  setDownloadUrl(null); // Reset the download URL
                }}
                leftIcon={<IconRotate size={16} />}
              >
                {t('generate.resetButton')}
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col md={6}>
            <Title order={4} mb="sm">
              {t('generate.yamlPreview')}
            </Title>
            <Textarea
              readOnly
              value={form.values.yamlPreview}
              placeholder={t('generate.yamlWillAppear')}
              autosize
              minRows={20}
              styles={{ textarea: { fontFamily: 'monospace' } }}
            />
            <Group mt="md">
              {downloadUrl && (
                <Button
                  variant="outline"
                  color="blue"
                  leftIcon={<IconDownload size={16} />}
                  component="a"
                  href={downloadUrl}
                  download={`${form.values.workflowName || 'workflow'}.yaml`}
                >
                  {t('generate.downloadButton')}
                </Button>
              )}
              {form.values.yamlPreview && (
                <Tooltip label="Copy YAML to clipboard" withArrow>
                  <Button
                    variant="outline"
                    color="teal"
                    leftIcon={<IconCopy size={16} />}
                    onClick={() => navigator.clipboard.writeText(form.values.yamlPreview)}
                  >
                    {t('generate.copyButton')}
                  </Button>
                </Tooltip>
              )}
            </Group>

            <div>
              <Title order={3} mb="lg">
                {t('generate.fileHistory')}
              </Title>

              {isLoggedIn ? (
                <>
                  {loadingHistory && <p>{t('generate.loadingHistory')}</p>}
                  {errorHistory && <Alert color="red">{errorHistory}</Alert>}
                  {fileHistory.length === 0 && !loadingHistory && <p>{t('generate.noHistory')}</p>}
                  <Accordion>
                    {fileHistory.slice(0, visibleFiles).map((file) => (
                      <Accordion.Item key={file.id} value={file.id.toString()}>
                        <Accordion.Control>
                          <Group>
                            <IconFileText size={16} />
                            <div>
                              <strong>{file.fileName}</strong>
                              <div style={{ fontSize: '0.85rem', color: 'gray' }}>
                                {t('generate.createdOn')} {new Date(file.generatedAt).toLocaleString()}
                              </div>
                            </div>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <FileDetails file={file} />
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                  {visibleFiles < fileHistory.length && (
                    <Button mt="md" variant="outline" onClick={handleShowMore}>
                      {t('generate.showMoreButton')}
                    </Button>
                  )}
                </>
              ) : (
                <Alert color="blue">
                  {t('generate.loggedOutMessage')}
                </Alert>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
};
