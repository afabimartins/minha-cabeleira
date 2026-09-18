import type { Assessment } from "./assessment";
import type { Finding } from "./finding";
import type { HairProfile } from "./hair-profile";

export type Diagnosis = {
  findings: Finding[];
  assessment: Assessment;
  profile: HairProfile;
};