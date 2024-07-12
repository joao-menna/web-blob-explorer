export async function loadLanguage(language: string) {
  const request = await fetch(`/i18n/${language}.json`)
  const languageText = await request.text()

  return JSON.parse(languageText)
}
