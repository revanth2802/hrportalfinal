from sqlalchemy.orm import Query

def paginate_results(query: Query, current_page: int, items_per_page: int):
    """
    Paginate the given SQLAlchemy query.

    Args:
        query (Query): The SQLAlchemy query object.
        current_page (int): The current page number (1-based index).
        items_per_page (int): The number of items per page.

    Returns:
        tuple: A tuple containing the paginated items and a dictionary with pagination details.
    """
    # Calculate total items and total pages
    total_records = query.count()
    pages_total = (total_records // items_per_page) + (1 if total_records % items_per_page else 0)

    # Fetch the paginated results using limit and offset
    paginated_items = query.limit(items_per_page).offset((current_page - 1) * items_per_page).all()

    # Construct the pagination metadata
    pagination_metadata = {
        'current_page': current_page,
        'items_per_page': items_per_page,
        'total_pages': pages_total,
        'total_items': total_records
    }

    return paginated_items, pagination_metadata