export interface Raca {
    id?: number,
    name?: string,
    weight?: {
        metric: string
    },
    height?: {
        metric: string
    },
    bred_for?: string,
    breed_group?: string,
    life_span?: string,
    temperament?: string,
    reference_image_id?: string,
}