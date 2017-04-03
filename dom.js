let dom = (function (root) {
    let $d = document;

    return {
        create(name, attrs = {}) {
            $el = $d.createElement(name);

            Object.keys(attrs).forEach(function (key) {
                $el.setAttribute(key, attrs[key]);
            });

            return $el;
        },

        findByID(name) {
            return $d.getElementById(name);
        }
    }
})(window);


