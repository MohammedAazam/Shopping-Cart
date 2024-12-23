import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearch(query); 
  };

  return (
    <div>
      <div className="relative">
  <Input
    type="search"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Search..."
    className="md:w-[100px] lg:w-[300px] pl-10" // Add left padding for the icon
  />
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
    <Search  />
  </span>
</div>
 
    </div>
  );
}
export { Search };

