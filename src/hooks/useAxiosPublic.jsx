import axios from 'axios';


const axiosPublic= axios.create({
    baseURL:'https://task-mart-server-web.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

// strategy={verticalListSortingStrategy}