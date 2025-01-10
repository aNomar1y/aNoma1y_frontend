// authAPI.js
export async function logout() {
  try {
    const response = await fetch("http://172.10.65:3000/auth/kakao/logout", {
      method: "POST",
      credentials: "include", // 쿠키 사용 시 필요
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${getToken()}`, // JWT가 필요하다면
      },
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function withdraw() {
  try {
    const response = await fetch("http://172.10.65:3000/auth/kakao/withdraw", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
