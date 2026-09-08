/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ESTIMATE_FORM_ENDPOINT?: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
