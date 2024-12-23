import { Button } from "@/components/ui/button";

export function OfferBanner() {
  return (
    <div className="relative bg-gray-100 overflow-hidden shadow-md">
      {/* Banner Image */}
      <img
        src="https://images.unsplash.com/photo-1607083207685-aaf05f2c908c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Offer Banner"
        className="w-full h-64 object-cover md:h-80"
      />

      {/* Banner Text Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-6 space-y-4">
        <h2 className="text-white text-2xl md:text-4xl font-bold">
          Mega New Year Sale is Here!!!
        </h2>
        <p className="text-white text-sm md:text-lg">
          Save up to 70% on electronics, fashion, and more. Limited time only!
        </p>
      </div>
    </div>
  );
}
