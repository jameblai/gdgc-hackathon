// ==============================
// TYPES
// ==============================

export type DomainWeightProp = Record<string, number>;
export type ResultProp = "positive" | "negative";

export const enum ClaimType {
  BIOGRAPHICAL,
  RELATIONAL,
  EVENT,
  OWNERSHIP,
  SKILL,
}

// ==============================
// USER NODE
// ==============================

export class UserNode {
  id: string;
  attestations: AttestationNode[] = [];
  claims: ClaimNode[] = [];

  baseTrust: number;
  domainTrust: DomainWeightProp;

  claimAccuracyScore: number;
  attestationAccuracyScore: number;
  participationScore: number;

  reciprocityPenaltyFactor: number | null;
  createdAt: Date;

  constructor(params: {
    id: string;
    baseTrust: number;
    domainTrust: DomainWeightProp;
    claimAccuracyScore: number;
    attestationAccuracyScore: number;
    participationScore: number;
    reciprocityPenaltyFactor: number | null;
  }) {
    this.id = params.id;
    this.baseTrust = params.baseTrust;
    this.domainTrust = params.domainTrust;
    this.claimAccuracyScore = params.claimAccuracyScore;
    this.attestationAccuracyScore = params.attestationAccuracyScore;
    this.participationScore = params.participationScore;
    this.reciprocityPenaltyFactor = params.reciprocityPenaltyFactor ?? 0;
    this.createdAt = new Date();
  }

  // ==============================
  // RESOLUTION LOGIC
  // ==============================

  resolveClaim(claim: ClaimNode, result: ResultProp) {
    this.updateBaseTrust(result);
    this.updateClaimAccuracyScore(result);
    this.updateDomainTrust(claim.domain, result);
    this.updateParticipationScore(result);
  }

  resolveAttestation(result: ResultProp) {
    this.updateBaseTrust(result);
    this.updateAttestationAccuracyScore(result);
    this.updateParticipationScore(result);
  }

  // ==============================
  // UPDATE FUNCTIONS
  // ==============================

  private updateBaseTrust(type: ResultProp) {
    const alpha = 0.2;
    const beta = 0.4;

    if (type === "positive") {
      this.baseTrust += alpha * (1 - this.baseTrust);
    } else {
      this.baseTrust -= beta * this.baseTrust;
    }
  }

  private updateClaimAccuracyScore(type: ResultProp) {
    const alpha = 0.2;
    const beta = 0.4;

    if (type === "positive") {
      this.claimAccuracyScore += alpha * (1 - this.claimAccuracyScore);
    } else {
      this.claimAccuracyScore -= beta * this.claimAccuracyScore;
    }
  }

  private updateAttestationAccuracyScore(type: ResultProp) {
    const alpha = 0.2;
    const beta = 0.4;

    if (type === "positive") {
      this.attestationAccuracyScore +=
        alpha * (1 - this.attestationAccuracyScore);
    } else {
      this.attestationAccuracyScore -= beta * this.attestationAccuracyScore;
    }
  }

  private updateParticipationScore(type: ResultProp) {
    const alpha = 0.2;
    const beta = 0.4;

    if (type === "positive") {
      this.participationScore += alpha * (1 - this.participationScore);
    } else {
      this.participationScore -= beta * this.participationScore;
    }
  }

  private updateDomainTrust(domain: string, type: ResultProp) {
    const alpha = 0.2;
    const beta = 0.4;

    if (!(domain in this.domainTrust)) {
      this.domainTrust[domain] = 0.5;
    }

    if (type === "positive") {
      this.domainTrust[domain] += alpha * (1 - this.domainTrust[domain]);
    } else {
      this.domainTrust[domain] -= beta * this.domainTrust[domain];
    }
  }
}

// ==============================
// CLAIM NODE
// ==============================

export class ClaimNode {
  id: string;
  claimant: UserNode;
  claimantUserId: string;

  domain: string;
  claimType: ClaimType;
  content: string;
  timestamp: Date;

  attestations: AttestationNode[] = [];

  opposeScore: number = 0;
  supportScore: number = 0;
  confidenceScore: number = 0;

  attestationPool: number = 300;

  status: "PENDING" | "FLAGGED" | "VERIFIED" = "PENDING";

  constructor(
    user: UserNode,
    content: string,
    domain: string,
    claimType: ClaimType,
  ) {
    this.id = crypto.randomUUID();
    this.claimant = user;
    this.claimantUserId = user.id;
    this.content = content;
    this.domain = domain;
    this.claimType = claimType;
    this.timestamp = new Date();

    user.claims.push(this);
  }

  addAttestation(attestation: AttestationNode) {
    if (attestation.stand === "support") {
      this.supportScore += attestation.finalWeight;
    } else {
      this.opposeScore += attestation.finalWeight;
    }

    this.attestations.push(attestation);
    this.updateConfidenceScore();
  }

  private updateConfidenceScore() {
    const total = this.supportScore + this.opposeScore;
    this.confidenceScore = total === 0 ? 0 : this.supportScore / total;
  }

  getConflictScore(): number {
    const total = this.supportScore + this.opposeScore;
    return total === 0 ? 0 : this.opposeScore / total;
  }
}

// ==============================
// ATTESTATION NODE
// ==============================

export class AttestationNode {
  id: string;
  stand: "support" | "oppose";

  attestant: UserNode;
  claim: ClaimNode;

  graphDistance: number;
  finalWeight: number;

  constructor(params: {
    attestant: UserNode;
    claim: ClaimNode;
    stand: "support" | "oppose";
    graphDistance: number;
  }) {
    this.id = crypto.randomUUID();
    this.attestant = params.attestant;
    this.claim = params.claim;
    this.stand = params.stand;
    this.graphDistance = params.graphDistance;

    this.finalWeight = this.calculateWeight();

    params.attestant.attestations.push(this);
    params.claim.addAttestation(this);
  }

  private calculateWeight(): number {
    const domainTrust = this.attestant.domainTrust[this.claim.domain] ?? 0.5;

    return (
      this.attestant.baseTrust * domainTrust * (1 / (1 + this.graphDistance))
    );
  }
}
