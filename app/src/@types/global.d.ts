declare interface WithId {
  id: string;
}

declare type Nullable<T> = T | null;

declare type PartialWithId<T extends WithId> = Pick<T, 'id'> & Partial<T>;
