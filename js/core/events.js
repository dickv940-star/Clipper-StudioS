const Events = {

    emit(name, detail = {}) {

        document.dispatchEvent(

            new CustomEvent(

                name,

                {

                    detail

                }

            )

        );

    },

    on(name, callback) {

        document.addEventListener(

            name,

            callback

        );

    }

};

export default Events;
