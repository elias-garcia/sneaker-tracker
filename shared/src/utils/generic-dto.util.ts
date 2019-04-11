import { Document } from "mongoose";

export function toGenericDto(doc: Document): any {
  const ret: Document = Object.assign(doc.toObject());

  ret.id = doc._id;
  delete ret._id;
  delete ret.__v;

  return ret;
}

export function toGenericDtoCollection(docs: Document[]): any[] {
  return docs.map((doc: Document) => toGenericDto(doc));
}
