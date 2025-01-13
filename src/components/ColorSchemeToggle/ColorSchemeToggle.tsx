import React from 'react';
import { ActionIcon, useMantineColorScheme, rem } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={isDark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      style={{ width: rem(32), height: rem(32) }}
    >
      {isDark ? (
        <IconSun size={rem(24)} color="var(--mantine-color-yellow-filled)" />
      ) : (
        <IconMoon size={rem(24)} color="var(--mantine-color-blue-filled)" />
      )}
    </ActionIcon>
  );
}
