import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

// fetch all projects
export const getAllJob = async (setProj) => {
    const token = cookies.get('auth');
    try {
        const data = await axios.get(`${reqUrl}/agent/jobs/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
        })
        setProj(data?.data?.allProj)
        return data;
    } catch (error) {
        console.log(error)
    }
}