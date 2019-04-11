import { ElementHandle, Page } from "puppeteer";
import { IProductFieldSelectorData, IRegExpData, ITextReplaceData } from "shared/interfaces";

function createRegExp(regExpData: IRegExpData): RegExp {
  return regExpData.mode
    ? new RegExp(regExpData.regExp, regExpData.mode)
    : new RegExp(regExpData.regExp);
}

function processRegExp(text: string, regExpData: IRegExpData): string | null {
  const regExp = createRegExp(regExpData);
  const matchResult = text.match(regExp);

  return matchResult
    ? matchResult[0]
    : null;
}

function processTextReplace(text: string, textReplaceData: ITextReplaceData): string {
  const regExp = createRegExp(textReplaceData.regExpData);

  return text.replace(regExp, textReplaceData.replaceWith);
}

async function processOneNode(
  node: ElementHandle,
  selectorData: IProductFieldSelectorData,
): Promise<string> {
  const processingData = selectorData.textProcessingData;
  let processedText;

  processedText = await (await node.getProperty(selectorData.property)).jsonValue();

  if (processingData && processingData.regExpData) {
    processedText = processRegExp(processedText, processingData.regExpData);
  }
  if (processingData && processingData.textReplaceData) {
    processedText = processTextReplace(processedText, processingData.textReplaceData);
  }

  processedText = processedText.trim();

  return processedText;
}

async function processMultipleNodes(
  nodes: ElementHandle[],
  selectorData: IProductFieldSelectorData,
): Promise<string[]> {
  return await Promise.all(
    nodes.map((node: ElementHandle) => processOneNode(node, selectorData)),
  );
}

export async function processSelector(
  page: Page,
  selectorData: IProductFieldSelectorData,
): Promise<string | string[] | null> {
  const nodes = await page.$$(selectorData.selector);

  if (nodes.length === 1) {
    return await processOneNode(nodes[0], selectorData);
  }

  if (nodes.length > 1) {
    return await processMultipleNodes(nodes, selectorData);
  }

  return null;
}
