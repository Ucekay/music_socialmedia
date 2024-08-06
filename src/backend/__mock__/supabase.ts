// __mocks__/supabase.ts
import { jest } from '@jest/globals';

const mockedSupabase = {
  auth: {
    getSession: jest.fn(),
  },
  from: jest.fn().mockReturnThis(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  select: jest.fn(),
  single: jest.fn(),
} as any;

export { mockedSupabase };