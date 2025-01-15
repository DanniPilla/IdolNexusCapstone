import { useEffect, useState } from "react";

const useFetch = (endpoint, options = {}, dependencies = [], transformData = (data) => data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(transformData(result));
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;

// import { useEffect, useState } from "react";

// const useFetch = (
//   endpoint,
//   options = {},
//   dependencies = [],
//   transformData = (data) => data
// ) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     if (!endpoint) return;

//     const fetchData = async () => {

//       setLoading(true);
//       try {
//         // Add Authorisation header if a token exists
//         const token = localStorage.getItem("token");
//         const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//         const response = await fetch(endpoint, {
//           ...options,
//           headers: {
//             "Content-Type": "application/json",
//             ...options.headers,
//             ...authHeaders,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const result = await response.json();
//          const transformedData = transformData(result);
//         setData(transformedData);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint, options, ...dependencies]);

//   return { data, loading, error };
// };

// export default useFetch;