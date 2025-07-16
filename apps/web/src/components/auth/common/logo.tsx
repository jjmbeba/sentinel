import { Link } from "@tanstack/react-router";
import { GalleryVerticalEndIcon } from "@/components/icons/gallery-vertical-end";

const Logo = () => {
	return (
		<Link className="flex items-center gap-4 font-medium" to="/">
			<div className="flex size-6 items-center justify-center rounded-md">
				<GalleryVerticalEndIcon />
			</div>
			<span className="font-bold text-lg">Sentinel</span>
		</Link>
	);
};

export default Logo;
