const BASE_URL = "http://192.168.0.19:5240";

export const apiService = {
  login: async (data: any) => {
    const response = await fetch(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  },

  register: async (userData: any, imageUri?: string) => {
    const formData = new FormData();
    formData.append("FirstName", userData.firstName);
    formData.append("LastName", userData.lastName);
    formData.append("Email", userData.email);
    formData.append("Password", userData.password);

    if (imageUri) {
      const filename = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("ImageFile", {
        uri: imageUri,
        name: filename || 'photo.jpg',
        type: type,
      } as any);
    }

    const response = await fetch(`${BASE_URL}/Auth/register`, {
      method: "POST",
      body: formData,
    });
    return response;
  }
};
