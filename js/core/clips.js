const Clips = {

    items: [],

    selected: null,

    create(duration) {

        this.items = [{
            id: crypto.randomUUID(),
            start: 0,
            end: duration
        }];

    },

    autoClip(duration, segment = 30) {

        this.items = [];

        let current = 0;

        while (current < duration) {

            this.items.push({

                id: crypto.randomUUID(),

                start: current,

                end: Math.min(
                    current + segment,
                    duration
                )

            });

            current += segment;

        }

    },

    split(time) {

        const clip = this.items.find(c =>
            time > c.start &&
            time < c.end
        );

        if (!clip) return;

        const index = this.items.indexOf(clip);

        const left = {

            id: crypto.randomUUID(),

            start: clip.start,

            end: time

        };

        const right = {

            id: crypto.randomUUID(),

            start: time,

            end: clip.end

        };

        this.items.splice(
            index,
            1,
            left,
            right
        );

    },

    delete(id) {

        this.items =
            this.items.filter(
                c => c.id !== id
            );

    }

};

export default Clips;
