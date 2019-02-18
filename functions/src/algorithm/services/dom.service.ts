import { RegExpData, SelectorData, TextReplaceData } from "../interfaces/shop-scraping-data.interface";

function createRegExp(regExpData: RegExpData): RegExp {
  return regExpData.mode
    ? new RegExp(regExpData.regExp, regExpData.mode)
    : new RegExp(regExpData.regExp);
}

function processRegExp(text: string, regExpData: RegExpData): string | null {
  const regExp = createRegExp(regExpData);
  const matchResult = text.match(regExp);

  return matchResult
    ? matchResult[0]
    : null;
}

function processTextReplace(text: string, textReplaceData: TextReplaceData): string {
  const regExp = createRegExp(textReplaceData.regExpData);

  return text.replace(regExp, textReplaceData.replaceWith);
}

export function processSelector(
  selectorData: SelectorData
): string | null {
  const node = document.querySelector(selectorData.selector);
  let processedText = null;

  if (node) {
    const processingData = selectorData.textProcessingData;

    processedText = (node as any)[selectorData.property];

    if (processingData && processingData.regExpData) {
      processedText = processRegExp(processedText, processingData.regExpData);
    }
    if (processingData && processingData.textReplaceData) {
      processedText = processTextReplace(processedText, processingData.textReplaceData);
    }

    processedText = processedText.trim();
  }

  return processedText;
}
