import { useSearchParams } from "react-router-dom";

const UsersList: React.FC<{ plantIdOverride?: string }> = ({
  plantIdOverride,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const plantId = searchParams.get("plantId");
  const role = searchParams.get("role");

  const updateFilter = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return <div></div>;
};

export default UsersList;
