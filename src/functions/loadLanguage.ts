export async function loadLanguage(language: string) {
  const request = await fetch(`/i18n/${language}.json`)
  const languageText = await request.text()

  console.log(languageText)

  return JSON.parse(languageText)
}
