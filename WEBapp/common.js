async function getID() {
    "use strict";

    let id = JSON.parse(localStorage.getItem("id"));
    if (id === null) {
        const res = await fetch("/NewUser", { method: "POST" });
        id = await res.json();
        localStorage.setItem("id", JSON.stringify(id));
    }
    return id;
}

(async () => {
    "use strict";

    const centerLatitude = 35.681236;
    const centerLongitude = 139.767125;
    const radius = 0.01;

    const id = await getID();

    Push.Permission.request();

    setInterval(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            // エリア外に出たら通知
            if (Math.hypot(latitude - centerLatitude, longitude - centerLongitude) > radius) {
                const res = await fetch("/KasaStatus", { method: "POST" });
                const status = await res.json();
                if (status.includes(id)) {
                    Push.create("！！！　傘を忘れています　！！！");
                }
            }
        });
    }, 10000);
})();
