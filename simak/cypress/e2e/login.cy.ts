describe("Login", () => {
  it("Tes login sebagai resepsionis", () => {
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 200,
      body: {
        data: {
          user: {
            username: "resepsionis",
            name: "Resepsionis",
            role: "receptionist",
          },
          access_token: "fake-token",
        },
      },
    }).as("loginRequest");

    cy.visit("/");

    cy.get("#email").type("resepsionis");
    cy.get("#password").type("password");
    cy.contains("button", "Sign In").click();

    cy.wait("@loginRequest");

    cy.contains("Resepsionis", { timeout: 10000 }).should("be.visible");
  });

  it("Tes login sebagai dokter", () => {
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 200,
      body: {
        data: {
          user: {
            username: "dokter",
            name: "Dokter",
            role: "doctor",
          },
          access_token: "fake-token",
        },
      },
    }).as("loginRequest");

    cy.visit("/");

    cy.get("#email").type("dokter");
    cy.get("#password").type("password");
    cy.contains("button", "Sign In").click();

    cy.wait("@loginRequest");

    cy.contains("Dokter", { timeout: 10000 }).should("be.visible");
  });

  it("Tes login sebagai staflab", () => {
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 200,
      body: {
        data: {
          user: {
            username: "staflab",
            name: "Staf Lab",
            role: "lab",
          },
          access_token: "fake-token",
        },
      },
    }).as("loginRequest");

    cy.visit("/");

    cy.get("#email").type("staflab");
    cy.get("#password").type("password");
    cy.contains("button", "Sign In").click();

    cy.wait("@loginRequest");

    cy.contains("Staf Lab", { timeout: 10000 }).should("be.visible");
  });

  it("Tes login sebagai kasir", () => {
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 200,
      body: {
        data: {
          user: {
            username: "kasir",
            name: "Kasir",
            role: "cashier",
          },
          access_token: "fake-token",
        },
      },
    }).as("loginRequest");

    cy.visit("/");

    cy.get("#email").type("kasir");
    cy.get("#password").type("password");
    cy.contains("button", "Sign In").click();

    cy.wait("@loginRequest");

    cy.contains("Kasir", { timeout: 10000 }).should("be.visible");
  });
  it("Tes login sebagai manajer", () => {
    cy.intercept("POST", "http://localhost:8000/api/login", {
      statusCode: 200,
      body: {
        data: {
          user: {
            username: "manajer",
            name: "Manajer",
            role: "manager",
          },
          access_token: "fake-token",
        },
      },
    }).as("loginRequest");

    cy.visit("/");

    cy.get("#email").type("manajer");
    cy.get("#password").type("password");
    cy.contains("button", "Sign In").click();

    cy.wait("@loginRequest");

    cy.contains("Manajer", { timeout: 10000 }).should("be.visible");
  });
});
