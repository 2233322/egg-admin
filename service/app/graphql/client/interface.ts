export interface AddClientInput {
  input: {
    clientId: string
    clientSecret: string
    redirectUri: string
    grants: string
  }
}