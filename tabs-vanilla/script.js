const tabsData = [
	{
		id: "1",
		title: "Tab 1",
		content: "This is a content for tab 1",
	},
	{
		id: "2",
		title: "Tab 2",
		content: "This is a content for tab 2",
	},
	{
		id: "3",
		title: "Tab 3",
		content: "This is a content for tab 3",
	},
];

document.addEventListener("DOMContentLoaded", function () {
	let activeTabId = tabsData[0].id;

	function renderTabs() {
		const tabContainer = document.getElementById("tabContainer");
		const tabContentContainer = document.getElementById("tabContentContainer");

		tabsData.forEach((tab) => {
			const tabBtn = document.createElement("button");
			tabBtn.className = "tabLinks";
			tabBtn.textContent = tab.title;
			tabBtn.setAttribute("data-tab", tab.id);
			tabContainer.appendChild(tabBtn);

			const tabContent = document.createElement("div");
			tabContent.id = tab.id;
			tabContent.className = "tabContent";
			tabContent.innerHTML = `<span> ${tab.content} </span>`;

			tabContentContainer.appendChild(tabContent);
		});

		tabContainer.addEventListener("click", function (event) {
			if (event.target.matches(".tabLinks")) {
				const tabId = event.target.getAttribute("data-tab");
				if (tabId !== activeTabId) {
					openTab(tabId);
					activeTabId = tabId;
				}
			}
		});
	}

	function openTab(tabId) {
		const tabContents = document.querySelectorAll(".tabContent");
		const tabLinks = document.querySelectorAll(".tabLinks");

		tabContents.forEach((tab) => tab.classList.remove("active"));
		tabLinks.forEach((tab) => tab.classList.remove("active"));

		document.getElementById(tabId).classList.add("active");
		document
			.querySelector(`button[data-tab="${tabId}"]`)
			.classList.add("active");
	}

	renderTabs();

	document.getElementById(activeTabId).classList.add("active");
	document
		.querySelector(`button[data-tab="${activeTabId}"]`)
		.classList.add("active");
});
