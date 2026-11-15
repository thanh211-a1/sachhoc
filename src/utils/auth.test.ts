import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateAdminCredentials, AUTHORIZED_ADMIN_PASSWORDS } from './auth';

describe('Admin Authentication Logic', () => {
  it('correctly accepts default school password thptcampha2026', () => {
    const result = validateAdminCredentials('thptcampha2026');
    assert.strictEqual(result.isValid, true);
    assert.ok(result.token?.startsWith('adm_token_'));
    assert.strictEqual(result.error, undefined);
  });

  it('handles leading and trailing whitespace properly', () => {
    const result = validateAdminCredentials('   thptcampha2026   ');
    assert.strictEqual(result.isValid, true);
    assert.ok(result.token);
  });

  it('rejects empty or whitespace-only password', () => {
    const result = validateAdminCredentials('   ');
    assert.strictEqual(result.isValid, false);
    assert.strictEqual(result.error, 'Vui lòng nhập mật khẩu quản trị');
  });

  it('rejects incorrect password with helpful hint', () => {
    const result = validateAdminCredentials('wrong_password_123');
    assert.strictEqual(result.isValid, false);
    assert.ok(result.error?.includes('thptcampha2026'));
  });

  it('supports custom server password if configured', () => {
    const result = validateAdminCredentials('mySecretSchoolPass2026', 'mySecretSchoolPass2026');
    assert.strictEqual(result.isValid, true);
    assert.ok(result.token);
  });
});
