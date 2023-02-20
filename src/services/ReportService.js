import ApiService from "./ApiService";

export async function apiGetReport() {
  return ApiService.fetchData({
    url: "/users",
    method: "get",
  });
}
