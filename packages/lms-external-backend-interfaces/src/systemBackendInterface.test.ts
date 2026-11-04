import { createSystemBackendInterface } from "./systemBackendInterface.js";

describe("systemBackendInterface", () => {
  it("should enforce build number as an integer on the version endpoint", () => {
    const iface = createSystemBackendInterface();
    const versionEndpoint = iface.getRpcEndpoint("version");
    expect(versionEndpoint).toBeDefined();

    const returnsSchema = versionEndpoint!.returns;
    expect(() => returnsSchema.parse({ version: "0.4.26", build: 4 })).not.toThrow();
    expect(() => returnsSchema.parse({ version: "0.4.26", build: 0 })).not.toThrow();
    expect(() => returnsSchema.parse({ version: "0.4.26", build: 4.5 })).toThrow();
    expect(() => returnsSchema.parse({ version: "0.4.26", build: "4" })).toThrow();
  });
});
