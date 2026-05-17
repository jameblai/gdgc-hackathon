// ==============================
// MOCK DATA
// ==============================

import { AttestationNode, ClaimNode, ClaimType, UserNode } from "./user";

function createMockUsers(): UserNode[] {
  return [
    new UserNode({
      id: "alice",
      baseTrust: 0.85,
      domainTrust: {
        sports: 0.9,
        coding: 0.75,
        eating: 0.6,
      },
      claimAccuracyScore: 0.9,
      attestationAccuracyScore: 0.85,
      participationScore: 0.95,
      reciprocityPenaltyFactor: 0.05,
    }),

    new UserNode({
      id: "bob",
      baseTrust: 0.6,
      domainTrust: {
        sports: 0.5,
        coding: 0.8,
        eating: 0.4,
      },
      claimAccuracyScore: 0.65,
      attestationAccuracyScore: 0.7,
      participationScore: 0.75,
      reciprocityPenaltyFactor: 0.1,
    }),

    new UserNode({
      id: "charlie",
      baseTrust: 0.3,
      domainTrust: {
        sports: 0.2,
        coding: 0.4,
        eating: 0.3,
      },
      claimAccuracyScore: 0.35,
      attestationAccuracyScore: 0.4,
      participationScore: 0.5,
      reciprocityPenaltyFactor: 0.2,
    }),
  ];
}

// ==============================
// EXAMPLE USAGE
// ==============================

const users = createMockUsers();

const claim = new ClaimNode(
  users[0],
  "I can bench 120kg",
  "sports",
  ClaimType.SKILL,
);

new AttestationNode({
  attestant: users[1],
  claim: claim,
  stand: "support",
  graphDistance: 2,
});

new AttestationNode({
  attestant: users[2],
  claim: claim,
  stand: "oppose",
  graphDistance: 1,
});

console.log("Support:", claim.supportScore);
console.log("Oppose:", claim.opposeScore);
console.log("Confidence:", claim.confidenceScore);
console.log("Conflict:", claim.getConflictScore());
