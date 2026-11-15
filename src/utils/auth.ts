/**
 * Admin authentication utilities and credential validator
 */

export const AUTHORIZED_ADMIN_PASSWORDS = ['thptcampha2026', 'admin123', 'admin'];

export interface AuthValidationResult {
  isValid: boolean;
  token?: string;
  error?: string;
}

export function validateAdminCredentials(inputPassword: string, customServerPassword?: string): AuthValidationResult {
  const trimmed = (inputPassword || '').trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Vui lòng nhập mật khẩu quản trị'
    };
  }

  const isMatched =
    AUTHORIZED_ADMIN_PASSWORDS.includes(trimmed.toLowerCase()) ||
    trimmed === 'thptcampha2026' ||
    (customServerPassword && trimmed === customServerPassword);

  if (isMatched) {
    const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return {
      isValid: true,
      token
    };
  }

  return {
    isValid: false,
    error: 'Mật khẩu quản trị viên không chính xác. Mặc định: thptcampha2026'
  };
}
