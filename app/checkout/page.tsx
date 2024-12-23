import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CheckoutPage from './components/checkout';

const Checkout = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-0">
                <Breadcrumb className="bg-gray-50 p-3 rounded-lg shadow-sm">
                    <BreadcrumbList className="flex items-center space-x-2">
                        <BreadcrumbItem>
                            <Link href="/" passHref>
                                    Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Check Out</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <CheckoutPage />
        </div>
    );
};

export default Checkout;
