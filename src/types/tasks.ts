/* "tasks": {
    "meta": {
        "total": 1,
        "per_page": 5,
        "current_page": 1,
        "last_page": 1,
        "first_page": 1,
        "first_page_url": "/?page=1",
        "last_page_url": "/?page=1",
        "next_page_url": null,
        "previous_page_url": null
    },
    "data": [
        {
            "id": 1,
            "title": "dfsd",
            "datetime": "2022-08-12T15:13:37.000Z",
            "description": "dfds",
            "is_done": 0,
            "created_at": "2022-08-11T12:13:43.000-03:00",
            "updated_at": "2022-08-11T12:13:43.000-03:00",
            "category": {
                "id": 1,
                "title": "fdsf",
                "color": "#ffffff"
            }
        }
    ]
}
} */
export type Category = {
   id: number;
   title: string;
   color: string;
};

export type CreateTask = {
   title: string;
   description: string;
   datetime: Date | string;
   category_id: number;
};

export type Task = {
   id: number;
   title: string;
   datetime: Date;
   description: string;
   is_done: number;
   created_at: Date;
   updated_at: Date;
   category: Category;
};
export type meta = {
   total: number;
   per_page: number;
   current_page: number;
   last_page: number;
   first_page: number;
   first_page_url: string;
   last_page_url: string;
   next_page_url: string | null;
   previous_page_url: string | null;
};

export type Tasks = {
   tasks: {
      meta: meta;
      data: Task[];
   };
};
