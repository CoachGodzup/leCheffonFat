export function mockOkResponse<T>(data: T): Promise<Response> {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

export function mockErrorResponse(
  status: number,
  statusText = "Error",
): Promise<Response> {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  } as Response);
}
