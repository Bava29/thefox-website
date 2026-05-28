(() => {
    const KEYS = {
        users: "thefox_users_v1",
        session: "thefox_session_v1",
    };

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const safeJsonParse = (s, fallback) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    const getUsers = () => {
        const raw = localStorage.getItem(KEYS.users);
        const data = safeJsonParse(raw, {});
        return data && typeof data === "object" ? data : {};
    };

    const setUsers = (users) => {
        localStorage.setItem(KEYS.users, JSON.stringify(users));
    };

    const getSession = () => {
        const raw = localStorage.getItem(KEYS.session);
        const data = safeJsonParse(raw, null);
        return data && typeof data === "object" ? data : null;
    };

    const setSession = (session) => {
        localStorage.setItem(KEYS.session, JSON.stringify(session));
    };

    const clearSession = () => {
        localStorage.removeItem(KEYS.session);
    };

    const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

    const setFieldHelp = (key, message) => {
        const el = document.querySelector(`[data-help="${key}"]`);
        if (!el) return;
        el.textContent = message || "";
    };

    const setError = (id, message) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = message || "";
        el.style.display = message ? "block" : "none";
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const page = (() => {
        const file = (location.pathname.split("/").pop() || "").toLowerCase();
        return file || "index.html";
    })();

    const isDashboardPage = () => page.startsWith("dashboard");
    const isLoginPage = () => page === "login.html";
    const isRegisterPage = () => page === "register.html";

    const redirectTo = (to) => {
        if (page === to) return;
        window.location.href = to;
    };

    // Note: dashboards are intentionally NOT protected.
    // Login/Register pages do not auto-redirect; navigation happens only on submit/logout.

    const wirePeekButtons = () => {
        $$("[data-peek]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const input = btn.closest(".auth__input")?.querySelector("input");
                if (!input) return;
                const next = input.type === "password" ? "text" : "password";
                input.type = next;
                btn.setAttribute("aria-label", next === "text" ? "Hide password" : "Show password");
            });
        });
    };

    const wireLogoutLinks = () => {
        const links = $$("[data-logout], .logout a");
        links.forEach((a) => {
            a.addEventListener("click", (e) => {
                const href = a.getAttribute("href") || "";
                if (href === "#" || href === "") e.preventDefault();
                clearSession();
                redirectTo("login.html");
            });
        });
    };

    const wireLogin = () => {
        const form = $("#login-form");
        if (!form) return;

        const emailEl = $("#login-email");
        const passEl = $("#login-password");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            setError("login-error", "");
            setFieldHelp("email", "");
            setFieldHelp("password", "");

            const email = normalizeEmail(emailEl?.value);
            const password = String(passEl?.value || "");

            if (!email || !validateEmail(email)) {
                setFieldHelp("email", "Enter a valid email.");
                return;
            }

            if (!password || password.length < 6) {
                setFieldHelp("password", "Password must be at least 6 characters.");
                return;
            }

            const users = getUsers();
            const user = users[email];
            if (!user || user.password !== password) {
                setError("login-error", "Invalid email or password.");
                return;
            }

            setSession({
                email,
                name: user.name || "User",
                createdAt: user.createdAt,
                loggedInAt: new Date().toISOString(),
            });

            redirectTo("dashboard.html");
        });
    };

    const wireRegister = () => {
        const form = $("#register-form");
        if (!form) return;

        const nameEl = $("#reg-name");
        const emailEl = $("#reg-email");
        const passEl = $("#reg-password");
        const confirmEl = $("#reg-confirm");
        const termsEl = $("#reg-terms");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            setError("register-error", "");
            setFieldHelp("name", "");
            setFieldHelp("email", "");
            setFieldHelp("password", "");
            setFieldHelp("confirm", "");

            const name = String(nameEl?.value || "").trim();
            const email = normalizeEmail(emailEl?.value);
            const password = String(passEl?.value || "");
            const confirm = String(confirmEl?.value || "");
            const termsOk = !!termsEl?.checked;

            if (!name || name.length < 2) {
                setFieldHelp("name", "Enter your name.");
                return;
            }

            if (!email || !validateEmail(email)) {
                setFieldHelp("email", "Enter a valid email.");
                return;
            }

            if (!password || password.length < 6) {
                setFieldHelp("password", "Password must be at least 6 characters.");
                return;
            }

            if (confirm !== password) {
                setFieldHelp("confirm", "Passwords do not match.");
                return;
            }

            if (!termsOk) {
                setError("register-error", "Please accept the Terms to continue.");
                return;
            }

            const users = getUsers();
            if (users[email]) {
                setError("register-error", "Account already exists. Please login.");
                return;
            }

            const createdAt = new Date().toISOString();
            users[email] = { name, email, password, createdAt };
            setUsers(users);

            setSession({ email, name, createdAt, loggedInAt: createdAt });
            redirectTo("dashboard.html");
        });
    };

    const reverseText = () => {
        const elements = $$("h1, h2, h3, h4, h5, h6, p, a, button, label, span");

        elements.forEach((el) => {
            el.childNodes.forEach((node) => {
                if (node.nodeType !== Node.TEXT_NODE) return;

                const text = node.textContent;
                const trimmed = text.trim();
                if (!trimmed) return;

                const leading = text.match(/^\s*/)[0];
                const trailing = text.match(/\s*$/)[0];
                node.textContent = leading + trimmed.split(" ").reverse().join(" ") + trailing;
            });
        });
    };

    // Theme and direction sync
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
    if (localStorage.getItem("direction") === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
        reverseText();
    }

    // Wire UI
    wirePeekButtons();
    wireLogin();
    wireRegister();
    wireLogoutLinks();
})();
