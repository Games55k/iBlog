export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function formatDateToYYYYMMDDLocal(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function timeAgo(date: Date): string {
	const now = new Date();
	const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (secondsAgo < 60) {
		return "刚刚";
	}

	const minutesAgo = Math.floor(secondsAgo / 60);
	if (minutesAgo < 60) {
		return `${minutesAgo} 分钟前`;
	}

	const hoursAgo = Math.floor(minutesAgo / 60);
	if (hoursAgo < 24) {
		return `${hoursAgo} 小时前`;
	}

	const daysAgo = Math.floor(hoursAgo / 24);
	if (daysAgo < 30) {
		return `${daysAgo} 天前`;
	}

	const monthsAgo = Math.floor(daysAgo / 30);
	if (monthsAgo < 12) {
		return `${monthsAgo} 个月前`;
	}

	const yearsAgo = Math.floor(monthsAgo / 12);
	return `${yearsAgo} 年前`;
}

export function getWeekday(date: Date): string {
	const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
	return weekdays[date.getDay()];
}
