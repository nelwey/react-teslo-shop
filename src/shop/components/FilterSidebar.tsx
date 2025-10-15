import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router";

export const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sizesParam = searchParams.get("sizes");
  const currentSizes = sizesParam ? sizesParam.split(",").filter(Boolean) : [];
  const currentPrice = searchParams.get('price') || 'any';

  const handleSizeChanged = (size: string) => {
    const newSizes = currentSizes.includes(size) ? currentSizes.filter(s => s !== size) : [...currentSizes, size]

    searchParams.set('page', '1');

    if (newSizes.length === 0) {
      searchParams.delete('sizes');
    } else {
      searchParams.set('sizes', newSizes.join(','));
    }
    setSearchParams(searchParams);
  }

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  const handlePriceChanged = (price: string) => {
    searchParams.set('page', '1');

    if (price === "any") {
      searchParams.delete('price');
    } else {
      searchParams.set('price', price);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              onClick={() => handleSizeChanged(size.id)}
              key={size.id}
              variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
              size="sm"
              className="h-8"
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup defaultValue="" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="priceAny" checked={currentPrice === 'any'} onClick={() => handlePriceChanged('any')} />
            <Label htmlFor="priceAny" className="text-sm cursor-pointer">Cualquier precio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="price1" checked={currentPrice === '0-50'} onClick={() => handlePriceChanged('0-50')} />
            <Label htmlFor="price1" className="text-sm cursor-pointer">$0 - $50</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="price2" checked={currentPrice === '50-100'} onClick={() => handlePriceChanged('50-100')} />
            <Label htmlFor="price2" className="text-sm cursor-pointer">$50 - $100</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="price3" checked={currentPrice === '100-200'} onClick={() => handlePriceChanged('100-200')} />
            <Label htmlFor="price3" className="text-sm cursor-pointer">$100 - $200</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="price4" checked={currentPrice === '200+'} onClick={() => handlePriceChanged('200+')} />
            <Label htmlFor="price4" className="text-sm cursor-pointer">$200+</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
