import { createSystemBackendInterface } from "./systemBackendInterface.js";
import { type z } from "zod";

describe("systemBackendInterface", () => {
  test("version endpoint returns schema requires an integer build number", () => {
    const backendInterface = createSystemBackendInterface();
    const versionEndpoint = backendInterface.getRpcEndpoint("version");
    expect(versionEndpoint).toBeDefined();

    const returnSchema = versionEndpoint!.returns as z.ZodType;

    // Valid integer build numbers should parse successfully
    const valid = returnSchema.safeParse({
      version: "0.4.26",
      build: 4,
    });
    expect(valid.success).toBe(true);

    // Floating-point build numbers must be rejected (issue #682)
    const floatResult = returnSchema.safeParse({
      version: "0.4.26",
      build: 4.5,
    });
    expect(floatResult.success).toBe(false);
  });
});
