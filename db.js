// Database Abstraction Layer - Firebase Firestore
// Replaces localStorage with cloud-based Firestore storage

const DB = {
    // ===== Purchase Orders =====
    async getPOs() {
        const snapshot = await db.collection('purchaseOrders').get();
        return snapshot.docs.map(function(doc) { return doc.data(); });
    },

    async getPO(poNumber) {
        const doc = await db.collection('purchaseOrders').doc(poNumber.toString()).get();
        return doc.exists ? doc.data() : null;
    },

    async savePO(po) {
        await db.collection('purchaseOrders').doc(po.poNumber.toString()).set(po);
    },

    async deletePO(poNumber) {
        await db.collection('purchaseOrders').doc(poNumber.toString()).delete();
    },

    // ===== Certificates =====
    async getCerts() {
        const snapshot = await db.collection('certificates').get();
        return snapshot.docs.map(function(doc) { return doc.data(); });
    },

    async getCert(refNumber) {
        const doc = await db.collection('certificates').doc(refNumber.toString()).get();
        return doc.exists ? doc.data() : null;
    },

    async saveCert(cert) {
        await db.collection('certificates').doc(cert.refNumber.toString()).set(cert);
    },

    async deleteCert(refNumber) {
        await db.collection('certificates').doc(refNumber.toString()).delete();
    },

    // ===== Counters =====
    async getCounter(name) {
        const doc = await db.collection('counters').doc(name).get();
        if (doc.exists) return doc.data().value;
        // Default values
        return name === 'currentPONumber' ? 259 : 60;
    },

    async setCounter(name, value) {
        await db.collection('counters').doc(name).set({ value: value });
    },

    async incrementCounter(name) {
        var ref = db.collection('counters').doc(name);
        return db.runTransaction(async function(transaction) {
            var doc = await transaction.get(ref);
            var defaultVal = name === 'currentPONumber' ? 259 : 60;
            var current = doc.exists ? doc.data().value : defaultVal;
            var next = current + 1;
            transaction.set(ref, { value: next });
            return next;
        });
    },

    // ===== Migration from localStorage =====
    async migrateFromLocalStorage() {
        if (localStorage.getItem('firestoreMigrated')) return;

        var localPOs = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');
        var localCerts = JSON.parse(localStorage.getItem('certificates') || '[]');

        if (localPOs.length === 0 && localCerts.length === 0) {
            localStorage.setItem('firestoreMigrated', 'true');
            return;
        }

        console.log('Migrating ' + localPOs.length + ' POs and ' + localCerts.length + ' certificates to Firestore...');

        // Migrate POs
        for (var i = 0; i < localPOs.length; i++) {
            await this.savePO(localPOs[i]);
        }

        // Migrate PO counter
        var poCounter = parseInt(localStorage.getItem('currentPONumber') || '259');
        await this.setCounter('currentPONumber', poCounter);

        // Migrate Certificates
        for (var j = 0; j < localCerts.length; j++) {
            await this.saveCert(localCerts[j]);
        }

        // Migrate Cert counter
        var certCounter = parseInt(localStorage.getItem('currentCertNumber') || '60');
        await this.setCounter('currentCertNumber', certCounter);

        localStorage.setItem('firestoreMigrated', 'true');
        console.log('Migration complete!');
    }
};
