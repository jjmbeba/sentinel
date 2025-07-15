export function must<T>(
	value: T | undefined | null,
	message = "Assertion failed. Required value is null or undefined."
): T {
	if (value === undefined || value === null) {
		throw new Error(message);
	}
	return value;
}

export const replaceDomain = (
	originalUrl: string,
	newOrigin: string
): string => {
	try {
		const urlObj = new URL(originalUrl);
		let path = urlObj.pathname;
		// Remove '/api/auth' prefix if present
		if (path.startsWith("/api/auth")) {
			path = path.replace("/api/auth", "");
			if (!path.startsWith("/")) {
				path = `/${path}`;
			}
		}
		const origin = newOrigin.endsWith("/") ? newOrigin.slice(0, -1) : newOrigin;
		return `${origin}${path}${urlObj.search}${urlObj.hash}`;
	} catch {
		return originalUrl;
	}
};
