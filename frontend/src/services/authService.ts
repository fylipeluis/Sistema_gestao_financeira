const DEMO_USUARIO = "demo";
const DEMO_SENHA = "demo123";
const TOKEN_KEY = "admin_token";

export async function loginAdmin(
  usuario: string,
  senha: string
): Promise<void> {
  if (usuario !== DEMO_USUARIO || senha !== DEMO_SENHA) {
    throw new Error("Credenciais inválidas");
  }
  localStorage.setItem(TOKEN_KEY, "demo-token");
}

export function logoutAdmin(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAdminAutenticado(): boolean {
  return getAdminToken() !== null;
}