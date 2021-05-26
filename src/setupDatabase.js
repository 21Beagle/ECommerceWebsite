const { Client } = require('pg');
require('dotenv').config();

(async () => {

  const usersTableStmt = `
  CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1024 CACHE 1 ),
    email character varying(250)[] COLLATE pg_catalog."default" NOT NULL,
    password character varying(250)[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
  `

  const productsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.items
  (
      id integer NOT NULL,
      name character varying(100) COLLATE pg_catalog."default" NOT NULL,
      description character varying(250) COLLATE pg_catalog."default" NOT NULL,
      price integer NOT NULL,
      CONSTRAINT items_pkey PRIMARY KEY (id)
  );
  
  `

  const ordersTableStmt = `
  CREATE TABLE IF NOT EXISTS public.orders
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1024 CACHE 1 ),
      user_id integer NOT NULL,
      status integer NOT NULL,
      total integer NOT NULL,
      CONSTRAINT orders_pkey PRIMARY KEY (id),
      CONSTRAINT user_id FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID
  );
  
  `

  const orderItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.order_items
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1024 CACHE 1 ),
      item_id integer NOT NULL,
      order_id integer NOT NULL,
      price integer NOT NULL,
      name character varying(50) COLLATE pg_catalog."default" NOT NULL,
      description character varying(250) COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT order_items_pkey PRIMARY KEY (id),
      CONSTRAINT item_id FOREIGN KEY (item_id)
          REFERENCES public.items (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID,
      CONSTRAINT order_id FOREIGN KEY (order_id)
          REFERENCES public.orders (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID
  );
  
  `

  const cartsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.cart
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1024 CACHE 1 ),
      user_id integer NOT NULL,
      CONSTRAINT cart_pkey PRIMARY KEY (id),
      CONSTRAINT id UNIQUE (id),
      CONSTRAINT user_id FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID
  );
  `

  const cartItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS public.cart_items
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1024 CACHE 1 ),
      user_id integer NOT NULL,
      price integer NOT NULL,
      cart_id integer NOT NULL,
      name character varying(50) COLLATE pg_catalog."default" NOT NULL,
      description character varying(250) COLLATE pg_catalog."default" NOT NULL,
      product_id integer NOT NULL,
      CONSTRAINT cart_id FOREIGN KEY (cart_id)
          REFERENCES public.cart (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID,
      CONSTRAINT product_id FOREIGN KEY (product_id)
          REFERENCES public.items (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID,
      CONSTRAINT user_id1 FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID
  );
  `

  try {
    const db = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    await db.end();
    console.log('Created tables succesfully')
  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();