import type { Evidence } from "./evidence";

export class EvidenceRegistry {
  private readonly evidence = new Map<string, Evidence>();

  constructor(initialEvidence: Evidence[] = []) {
    for (const item of initialEvidence) {
      this.add(item);
    }
  }

  add(item: Evidence): void {
    if (this.evidence.has(item.id)) {
      throw new Error(
        `Evidence with id "${item.id}" already exists.`,
      );
    }

    this.evidence.set(item.id, item);
  }

  get(id: string): Evidence | undefined {
    return this.evidence.get(id);
  }

  getMany(ids: string[]): Evidence[] {
    return ids
      .map((id) => this.evidence.get(id))
      .filter(
        (item): item is Evidence =>
          item !== undefined,
      );
  }

  getActive(ids: string[]): Evidence[] {
    return this.getMany(ids).filter(
      (item) => item.status === "active",
    );
  }

  all(): Evidence[] {
    return Array.from(this.evidence.values());
  }
}