export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error(`no $root provided for DomListener`)
    }

    this.$root = $root
  }
}
