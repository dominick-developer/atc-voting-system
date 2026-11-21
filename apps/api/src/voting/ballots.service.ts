import { BadRequestException, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { SelectionDto } from "./dto/submit-ballot.dto";

type StoredBallot = {
  id: string;
  receiptId: string;
  electionId: string;
  selections: SelectionDto[];
  submittedAt: string;
};

/**
 * ⚠️  DEMO MODE — in-memory storage only.
 *
 * Privacy boundary preserved:
 *  - `votedAdmissions` tracks WHO has voted (to prevent duplicates)
 *  - `ballots` stores WHAT was voted, anonymously
 *  - The two structures are NEVER linked.
 *
 * Replace with Prisma / PostgreSQL before production.
 */
@Injectable()
export class BallotsService {
  // electionId -> Set<admissionNumber>
  private votedAdmissions = new Map<string, Set<string>>();

  // Anonymous ballots — no voter identity stored here
  private ballots: StoredBallot[] = [];

  private receiptCounter = 0;

  hasVoted(electionId: string, admissionNumber: string): boolean {
    return this.votedAdmissions.get(electionId)?.has(admissionNumber) ?? false;
  }

  submit(electionId: string, admissionNumber: string, selections: SelectionDto[]) {
    if (this.hasVoted(electionId, admissionNumber)) {
      throw new BadRequestException("You have already voted in this election.");
    }

    // Guard: at least one selection
    if (!selections || selections.length === 0) {
      throw new BadRequestException("No selections provided.");
    }

    // Guard: no duplicate positions in one ballot
    const seenPositions = new Set<string>();
    for (const s of selections) {
      if (seenPositions.has(s.positionId)) {
        throw new BadRequestException(`Duplicate position: ${s.positionId}`);
      }
      seenPositions.add(s.positionId);
    }

    const id = randomUUID();
    this.receiptCounter += 1;
    const receiptId = `ATC-E${new Date().getFullYear()}-${String(this.receiptCounter).padStart(6, "0")}`;
    const submittedAt = new Date().toISOString();

    // Store ANONYMOUS ballot
    this.ballots.push({ id, receiptId, electionId, selections, submittedAt });

    // Track voter separately
    if (!this.votedAdmissions.has(electionId)) {
      this.votedAdmissions.set(electionId, new Set());
    }
    this.votedAdmissions.get(electionId)!.add(admissionNumber);

    // Return only receipt — never reveal vote
    return { receiptId, accepted: true, submittedAt };
  }

  tally(electionId: string) {
    const list = this.ballots.filter((b) => b.electionId === electionId);
    const counts = new Map<string, number>();

    for (const b of list) {
      for (const s of b.selections) {
        const key = `${s.positionId}:${s.candidateId}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }

    const results = Array.from(counts.entries()).map(([key, votes]) => {
      const [positionId, candidateId] = key.split(":");
      return { positionId, candidateId, votes };
    });

    return {
      electionId,
      totalBallots: list.length,
      results,
      updatedAt: new Date().toISOString(),
    };
  }
}