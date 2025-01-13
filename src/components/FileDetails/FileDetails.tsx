import { Button, Textarea, Group, Tooltip } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { IconCopy, IconDownload } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';

export const FileDetails = ({ file }) => {
  const [fileContent, setFileContent] = useState('Loading preview...');
  const [loading, setLoading] = useState(true);

  const { t } = useLanguage(); // Access the translation function

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(file.fileUrl);
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        setFileContent('Preview unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [file.fileUrl]);

  return (
    <div>
      <Textarea
        readOnly
        value={loading ? 'Loading preview...' : fileContent}
        placeholder="Preview unavailable"
        autosize
        minRows={4}
        mt="md"
        styles={{ textarea: { fontFamily: 'monospace' } }}
      />
      <Group mt="md">
        <Button
          variant="outline"
          color="blue"
          leftIcon={<IconDownload size={16} />}
          component="a"
          href={file.fileUrl}
          download={file.fileName}
        >
          {t('generate.downloadButton')}
        </Button>
        <Tooltip label="Copy YAML to clipboard" withArrow>
          <Button
            variant="outline"
            color="teal"
            leftIcon={<IconCopy size={16} />}
            onClick={() => navigator.clipboard.writeText(fileContent || '')}
          >
            {t('generate.copyButton')}
          </Button>
        </Tooltip>
      </Group>
    </div>
  );
};
