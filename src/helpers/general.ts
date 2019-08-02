import { ISettings } from '../models/guild';

const allowedSettings: Array<string> = [
  'prefix',
  'user_role',
  'bot_role',
  'auto_assign_roles',
  'member_logs_channel',
  'member_logging',
  'disabled'
];

export interface IDisabled {
  command: string;
  channels: string[];
}

export interface IAllowedSettings {
  prefix: string;
  user_role: string;
  bot_role: string;
  auto_assign_roles: boolean;
  member_logs_channel: string;
  member_logging: boolean;
  disabled: IDisabled[];
}

export function validateID(id: string) {
  const reg: RegExp = /^[0-9]{17,19}$/;

  return reg.test(id);
}

export function parseSettings(
  guildSettings: ISettings,
  settingsObj: IAllowedSettings
) {
  for (const [key, value] of Object.entries(settingsObj)) {
    if (!allowedSettings.includes(key)) {
      return { error: `${key} is not a valid settings key` };
    }

    if (
      ['user_role', 'bot_role', 'member_logs_channel'].includes(key) &&
      !validateID(value)
    ) {
      return { error: `${value} is not a valid ID` };
    }

    if (
      ['auto_assign_roles', 'member_logging'].includes(key) &&
      typeof value !== 'boolean'
    ) {
      return { error: `Invalid value for ${key}. Expected Boolean` };
    }

    guildSettings[key] = value;
  }

  return { parsed: guildSettings };
}
