import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

ModuleRegistry.registerModules([AllCommunityModule]);

const customDarkTheme = themeQuartz.withParams({
  accentColor: '#4a9eff',
  backgroundColor: '#1a1f2e',
  foregroundColor: '#ffffff',
  borderColor: '#2a3142',
  headerBackgroundColor: '#0f1419',
  headerTextColor: '#ffffff',
  oddRowBackgroundColor: '#1a1f2e',
  rowHoverColor: '#2a3142',
  columnHoverColor: '#2a3142',
  spacing: 8,
  borderRadius: 6,
});

interface Director {
  id: number;
  firstname: string;
  lastname: string;
}

interface Actor {
  id: number;
  firstname: string;
  lastname: string;
}

interface ActorParticipation {
  actor: Actor;
  nameInMovie?: string;
}

interface Movie {
  id: number;
  name: string;
  description?: string;
  releaseDate?: string;
  imageUrl?: string;
  director?: Director;
  actorParticipations?: ActorParticipation[];
}

interface MoviesDataGridProps {
  movies: Movie[];
}

export default function MoviesDataGrid({ movies }: MoviesDataGridProps) {
  const navigate = useNavigate();

  const columnDefs: ColDef<Movie>[] = useMemo(() => [
    {
      field: 'imageUrl',
      headerName: 'Poster',
      width: 120,
      sortable: false,
      cellRenderer: (params: any) => {
        if (!params.value) {
          return <div style={{ color: '#8b92a7' }}>-</div>;
        }
        return (
          <img 
            src={params.value} 
            alt="poster"
            style={{
              width: '50px',
              height: '75px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        );
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: 'name',
      headerName: 'Title',
      flex: 1,
      sortable: true,
      filter: true,
      cellStyle: { color: '#4a9eff', cursor: 'pointer', fontWeight: 'bold' },
    },
    {
      field: 'director',
      headerName: 'Director',
      width: 180,
      sortable: true,
      filter: true,
      valueGetter: (params: any) => {
        const director = params.data?.director;
        return director ? `${director.firstname} ${director.lastname}` : '-';
      },
    },
    {
      headerName: 'Actors',
      width: 250,
      sortable: false,
      filter: true,
      valueGetter: (params: any) => {
        const participations = params.data?.actorParticipations;
        if (!participations || participations.length === 0) return '-';
        return participations
          .map((p: ActorParticipation) => `${p.actor.firstname} ${p.actor.lastname}`)
          .join(', ');
      },
      cellRenderer: (params: any) => {
        const value = params.value;
        if (value === '-') return value;
        return value.length > 50 ? value.substring(0, 50) + '...' : value;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      sortable: false,
      filter: true,
      cellRenderer: (params: any) => {
        const desc = params.value || 'No description';
        return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
      },
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      width: 140,
      sortable: true,
      filter: 'agDateColumnFilter',
      cellRenderer: (params: any) => {
        if (!params.value) return '-';
        return new Date(params.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    sortable: true,
  }), []);

  const onRowClicked = (event: any) => {
    navigate(`/movie/${event.data.id}`);
  };

  return (
    <div 
      style={{ 
        height: '600px', 
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #2a3142',
      }}
    >
      <AgGridReact
        theme={customDarkTheme}
        rowData={movies}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onRowClicked={onRowClicked}
        pagination={true}
        paginationPageSize={20}
        domLayout="normal"
        rowHeight={70}
      />
    </div>
  );
}
