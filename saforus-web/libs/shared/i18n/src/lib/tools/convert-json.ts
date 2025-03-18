import * as fs from 'fs-extra';
import * as path from 'path';

const inputFilePath = process.argv[2];
const outputPath = process.argv[3];

if (!inputFilePath || !outputPath) {
  console.error(
    'Usage: ts-node convertTranslations.ts <input-file> <output-folder>'
  );
  process.exit(1);
}

async function convertTsToJson() {
  const { translations } = await import(path.resolve(inputFilePath));
  // console.log(translations);
  for (const lang of Object.keys(translations)) {
    const jsonContent = JSON.stringify(translations[lang], null, 2);
    const outputFilePath = path.join(outputPath, `${lang}.json`);

    await fs.ensureFile(outputFilePath);
    await fs.writeFile(outputFilePath, jsonContent);
    // console.info(`Converted ${lang}.ts to ${outputFilePath}`);
  }
}

convertTsToJson().catch((error) => {
  console.error('An error occurred during conversion:', error);
});

// TODO: Run npx ts-node convertTranslations.ts ./path/to/your/translations.ts ./path/to/output/json/folder
// TODO: Example: Run npx ts-node --project tsconfig.script.json libs/shared/i18n/src/lib/tools/convert-json.ts libs/shared/i18n/src/lib/locales/en-US/index.ts libs/shared/i18n/src/lib/locales/en-US
