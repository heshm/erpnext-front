
const getCategoryName = (id, appList) => {
	let name = "其它";
	for (let item of appList) {
		if (id === item.id) {
			name = item.name;
			break;
		}
	}
	return name;
}

export {
	getCategoryName
}