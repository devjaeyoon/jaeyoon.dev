import { describe, expect, it } from "vitest";

import {
  comparePostDatesDescending,
  parsePostDate,
  postDateSchema,
  toHtmlDateTime,
} from "@/lib/dates";

describe("postDateSchema", () => {
  it.each([
    "0001.01.01",
    "2023.12.31",
    "2024.02.29",
    "9999.12.31",
  ])("유효한 날짜 %s를 허용한다", (dateStr) => {
    expect(postDateSchema.safeParse(dateStr).success).toBe(true);
  });

  it.each([
    "2024/02/29",
    "2024-02-29",
    "2024.2.29",
    "2024.02.9",
    "24.02.29",
    "2024.02.29\n",
  ])("구분자와 zero-padding이 잘못된 %s를 거부한다", (dateStr) => {
    expect(postDateSchema.safeParse(dateStr).success).toBe(false);
  });

  it.each([
    "2023.02.29",
    "2024.02.30",
    "2024.04.31",
    "2024.00.01",
    "2024.13.01",
  ])("존재하지 않는 날짜 %s를 거부한다", (dateStr) => {
    expect(postDateSchema.safeParse(dateStr).success).toBe(false);
  });

  it("연도 0000을 거부한다", () => {
    expect(postDateSchema.safeParse("0000.01.01").success).toBe(false);
  });
});

describe("parsePostDate", () => {
  it("날짜를 UTC 자정으로 파싱한다", () => {
    expect(parsePostDate("2026.08.24").toISOString()).toBe("2026-08-24T00:00:00.000Z");
    expect(parsePostDate("0001.01.01").toISOString()).toBe("0001-01-01T00:00:00.000Z");
  });

  it("잘못된 날짜를 RangeError로 거부한다", () => {
    expect(() => parsePostDate("2023.02.29")).toThrow(RangeError);
  });
});

describe("toHtmlDateTime", () => {
  it("HTML 기계 판독 형식으로 변환한다", () => {
    expect(toHtmlDateTime("2026.08.24")).toBe("2026-08-24");
  });

  it("잘못된 날짜를 RangeError로 거부한다", () => {
    expect(() => toHtmlDateTime("2026/08/24")).toThrow(RangeError);
  });
});

describe("comparePostDatesDescending", () => {
  it("동일한 날짜를 같다고 비교한다", () => {
    expect(comparePostDatesDescending("2026.08.24", "2026.08.24")).toBe(0);
  });

  it("최신 날짜부터 정렬한다", () => {
    const dates = ["2024.03.31", "2026.05.14", "2023.12.24", "2026.08.24"];

    expect(dates.sort(comparePostDatesDescending)).toEqual([
      "2026.08.24",
      "2026.05.14",
      "2024.03.31",
      "2023.12.24",
    ]);
  });
});
